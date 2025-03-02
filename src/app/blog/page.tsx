
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const blogPosts = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  category: i % 2 === 0 ? "Travel Guide" : "Photography",
  date: `Feb ${i + 1}, 2025`,
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}));

const POSTS_PER_PAGE = 9;

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showScroll, setShowScroll] = useState(false);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const currentPosts = blogPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-3 gap-6">

      </div>

      <div className="flex justify-between items-center mt-6">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </Button>
      </div>

      {showScroll && (
        <div className="fixed bottom-10 right-10 flex flex-col gap-2">
          <Button onClick={scrollToTop} className="rounded-full p-3">
            <ChevronUp size={20} />
          </Button>
          <Button onClick={scrollToBottom} className="rounded-full p-3">
            <ChevronDown size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

