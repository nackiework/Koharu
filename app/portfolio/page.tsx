"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PortfolioCard } from '@/components/portfolio-card';
import { ChevronRight, ArrowLeft, Image as ImageIcon, FolderOpen, Sparkles as SparklesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FolderNode {
  name: string;
  folders: { [key: string]: FolderNode };
  images: { id: string, name: string }[];
}

interface PortfolioData {
  success: boolean;
  data: FolderNode;
}

// Helper: get first image from a folder recursively
function getFirstImage(node: FolderNode): { id: string, name: string } | null {
  if (node.images && node.images.length > 0) {
    return node.images[0];
  }
  for (const key of Object.keys(node.folders || {})) {
    const found = getFirstImage(node.folders[key]);
    if (found) return found;
  }
  return null;
}

// Helper: count all images recursively
function countAllImages(node: FolderNode): number {
  let count = node.images?.length || 0;
  for (const key of Object.keys(node.folders || {})) {
    count += countAllImages(node.folders[key]);
  }
  return count;
}

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const fetchPortfolio = async (isRetry = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio?t=${Date.now()}`);
      const result = await res.json();
      
      // Check if data is truly empty (Root folder with no subfolders and no images)
      const isEmpty = result.success && 
                     result.data && 
                     Object.keys(result.data.folders || {}).length === 0 && 
                     (result.data.images || []).length === 0;

      if (isEmpty && !isRetry) {
        console.log('Data is empty, retrying once...');
        setTimeout(() => fetchPortfolio(true), 1000);
        return;
      }

      if (result.success && result.data) {
        setData(result);
        setHasError(false);
      } else {
        console.error('API returned success:false or missing data', result);
        setHasError(true);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Recursive Navigation Logic
  const getCurrentNode = () => {
    if (!data || !data.data) return null;
    let current = data.data;
    for (const pathPart of currentPath) {
      if (current.folders && current.folders[pathPart]) {
        current = current.folders[pathPart];
      } else {
        return null;
      }
    }
    return current;
  };

  const currentNode = getCurrentNode();

  const goBack = () => {
    setCurrentPath(prev => prev.slice(0, -1));
  };

  const enterFolder = (name: string) => {
    setCurrentPath(prev => [...prev, name]);
  };

  return (
    <main className="min-h-screen pb-12 bg-background overflow-hidden">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header & Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            {currentPath.length > 0 && (
              <button
                onClick={goBack}
                className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary active:scale-90 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-black text-[#89AAD7] tracking-tight">
                {currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'Gallery'}
              </h1>
              {currentPath.length === 0 && (
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Koharu Art Collection</p>
              )}
            </div>
          </div>

          {currentPath.length > 0 && (
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 overflow-x-auto whitespace-nowrap py-1 scrollbar-hide">
              <button onClick={() => setCurrentPath([])} className="hover:text-primary transition-colors">Gallery</button>
              {currentPath.map((path, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 opacity-30" />
                  <button
                    onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                    className={cn("hover:text-primary transition-colors", i === currentPath.length - 1 && "text-primary")}
                  >
                    {path}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath.join('/')}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100 && currentPath.length > 0) {
                  goBack();
                }
              }}
              className="space-y-6"
            >
              {currentNode && !hasError ? (
                <>
                  {/* Folder List - with thumbnails */}
                  {Object.keys(currentNode.folders).length > 0 && (
                    <div className="space-y-3">
                      {Object.keys(currentNode.folders).map((folderName) => {
                        const folder = currentNode.folders[folderName];
                        const preview = getFirstImage(folder);
                        const totalImages = countAllImages(folder);
                        const subFolderCount = Object.keys(folder.folders).length;

                        return (
                          <button
                            key={folderName}
                            onClick={() => enterFolder(folderName)}
                            className="w-full flex items-center gap-4 p-3 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all group active:scale-[0.98] text-left"
                          >
                            {/* Thumbnail Preview */}
                            <div className="relative w-20 h-20 rounded-[1.2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                              {preview ? (
                                <Image
                                  src={`/api/portfolio/image?id=${preview.id}`}
                                  alt={folderName}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <FolderOpen className="w-8 h-8 text-slate-200" />
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-black text-[#5A7A9E] truncate tracking-tight group-hover:text-primary transition-colors">
                                {folderName}
                              </h3>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] font-bold text-[#89AAD7] bg-[#E3F2FD] px-2.5 py-1 rounded-full">
                                  {totalImages} images
                                </span>
                                {subFolderCount > 0 && (
                                  <span className="text-[10px] font-bold text-[#F2C1D1] bg-[#FFF1F2] px-2.5 py-1 rounded-full">
                                    {subFolderCount} folders
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight className="w-5 h-5 text-[#89AAD7] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Image Grid */}
                  {currentNode.images.length > 0 && (
                    <div className="space-y-4">
                      {Object.keys(currentNode.folders).length > 0 && (
                        <div className="flex items-center gap-2 px-1 pt-2">
                          <ImageIcon className="w-4 h-4 text-slate-300" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Images ({currentNode.images.length})</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        {currentNode.images.map((item: any) => (
                          <PortfolioCard
                            key={item.id}
                            item={{
                              id: item.id,
                              title: item.name,
                              category: currentPath[currentPath.length - 1] || 'General',
                              image: `/api/portfolio/image?id=${item.id}`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {Object.keys(currentNode.folders).length === 0 && currentNode.images.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-8 h-8 text-slate-200" />
                      </div>
                      <h3 className="text-sm font-black text-slate-400 tracking-tight">ไม่มีข้อมูลในโฟลเดอร์นี้</h3>
                      <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                        <SparklesIcon className="w-3 h-3" />
                        Coming Soon
                      </p>
                      <button 
                        onClick={() => fetchPortfolio()}
                        className="mt-6 px-6 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                      >
                        กดเพื่อโหลดใหม่ (Retry)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-red-50">
                  <p className="text-sm text-red-400 font-bold">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                  <p className="text-[10px] text-slate-400 mt-2 px-6 leading-relaxed">ระบบอาจจะกำลังพักเครื่องหรือ Google Apps Script ขัดข้องชั่วคราวครับ</p>
                  <button 
                    onClick={() => fetchPortfolio()}
                    className="mt-6 px-6 py-2 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95"
                  >
                    ลองใหม่อีกครั้ง
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>


    </main>
  );
}
