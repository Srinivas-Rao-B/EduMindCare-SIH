import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Share2, Plus, Search, Filter, Mic, Play, Trash2 } from 'lucide-react';
import { ForumPost, ForumReply } from '../../types';
import { formatDistanceToNow } from 'date-fns';

const PeerForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'Anonymous',
      title: 'Coping with exam anxiety',
      content: 'Anyone else feeling overwhelmed with upcoming exams? Looking for some study strategies that help with anxiety.',
      category: 'Academic',
      likes: 12,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isAnonymous: true,
      replies: [
        { id: 'r1', author: 'Jane D.', content: 'I find the Pomodoro technique really helps me stay focused without getting too stressed.', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), isAnonymous: false }
      ]
    },
    {
      id: '2',
      author: 'Alex M.',
      title: 'Finding balance between studies and social life',
      content: 'I feel like I\'m missing out on social activities because of my studies. How do you manage both?',
      category: 'Social',
      likes: 8,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isAnonymous: false,
      replies: []
    }
  ]);
  
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General',
    isAnonymous: true,
    voiceMessageUrl: undefined as string | undefined
  });

  const [isRecording, setIsRecording] = useState(false);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['All', 'Academic', 'Social', 'Mental Health', 'General', 'Support'];

  const handleRecordVoice = () => {
    setIsRecording(true);
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    recordingTimeoutRef.current = setTimeout(() => {
      setIsRecording(false);
      setNewPost(prev => ({ ...prev, voiceMessageUrl: 'simulated_voice_message.mp3' }));
    }, 2000);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: ForumPost = {
      id: Date.now().toString(),
      author: newPost.isAnonymous ? 'Anonymous' : 'You',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      timestamp: new Date(),
      isAnonymous: newPost.isAnonymous,
      voiceMessageUrl: newPost.voiceMessageUrl,
      replies: []
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: 'General', isAnonymous: true, voiceMessageUrl: undefined });
    setShowNewPost(false);
  };

  const handleSubmitReply = (postId: string) => {
    if (!replyContent.trim()) return;
    const reply: ForumReply = {
      id: `reply-${Date.now()}`,
      author: 'You (Anonymous)',
      content: replyContent,
      timestamp: new Date(),
      isAnonymous: true
    };
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, replies: [...post.replies, reply] } : post
    ));
    setReplyContent('');
    setReplyingTo(null);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Peer Forum</h2>
          <p className="text-gray-600">Connect with fellow students and share experiences</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewPost(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {showNewPost && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <input type="text" value={newPost.title} onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="What's on your mind?" />
            <textarea value={newPost.content} onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Share your thoughts..." />
            
            {newPost.voiceMessageUrl && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Play className="w-5 h-5" />
                  <span className="text-sm font-medium">Voice message attached</span>
                </div>
                <button onClick={() => setNewPost(p => ({ ...p, voiceMessageUrl: undefined }))}><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select value={newPost.category} onChange={(e) => setNewPost(p => ({ ...p, category: e.target.value }))} className="px-4 py-2 border border-gray-300 rounded-lg">
                  {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="anonymous" checked={newPost.isAnonymous} onChange={(e) => setNewPost(p => ({ ...p, isAnonymous: e.target.checked }))} className="w-4 h-4 text-blue-600 rounded" />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">Post anonymously</label>
                </div>
              </div>
              <motion.button type="button" onClick={handleRecordVoice} whileTap={{ scale: 0.95 }} className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-700'}`}>
                <Mic className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex space-x-3">
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Post</motion.button>
              <button type="button" onClick={() => setShowNewPost(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{post.author}</span>
                  <span className={`px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800`}>{post.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                {post.voiceMessageUrl && (
                  <div className="mt-3">
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                      <Play className="w-4 h-4" />
                      <span>Play voice message</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <motion.button onClick={() => handleLike(post.id)} className="flex items-center space-x-2 text-gray-500 hover:text-red-600"><Heart className="w-4 h-4" /> <span className="text-sm">{post.likes}</span></motion.button>
                <button onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)} className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"><MessageSquare className="w-4 h-4" /> <span className="text-sm">{post.replies.length} replies</span></button>
              </div>
              <span className="text-sm text-gray-500">{formatDistanceToNow(post.timestamp, { addSuffix: true })}</span>
            </div>

            <AnimatePresence>
              {replyingTo === post.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-4">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="pl-6 border-l-2 border-gray-200">
                      <p className="text-sm text-gray-800">{reply.content}</p>
                      <p className="text-xs text-gray-500 mt-1">- {reply.author}, {formatDistanceToNow(reply.timestamp, { addSuffix: true })}</p>
                    </div>
                  ))}
                  <div className="pl-6 border-l-2 border-gray-200">
                    <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={2} className="w-full p-2 border rounded-lg" placeholder="Write a reply..."></textarea>
                    <button onClick={() => handleSubmitReply(post.id)} className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded-lg">Reply</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PeerForum;
