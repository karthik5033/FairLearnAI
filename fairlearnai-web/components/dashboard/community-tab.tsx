import React from "react"
import { motion } from "framer-motion"
import { 
    MessageSquare, 
    Heart, 
    Share2, 
    MoreHorizontal,
    Search,
    hash,
    Hash,
    Trophy,
    Medal
} from "lucide-react"

const posts = [
    {
        id: 1,
        author: "Sarah Jenkins",
        role: "Architecture Student",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        time: "2 hours ago",
        title: "Best resources for learning Rhino 3D?",
        content: "I'm starting a new project and looking for some advanced tutorials on parametric modeling in Rhino. Any recommendations?",
        tags: ["Design", "3D Modeling", "Resources"],
        likes: 24,
        comments: 12,
        hasLiked: true
    },
    {
        id: 2,
        author: "David Chen",
        role: "Computer Science",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        time: "4 hours ago",
        title: "Help understanding Big O notation",
        content: "I'm struggling to differentiate between O(n log n) and O(n^2) in sorting algorithms. Can someone explain it simply?",
        tags: ["Algorithms", "CS", "Help"],
        likes: 56,
        comments: 34,
        hasLiked: false
    }
]

const leaderboard = [
    { rank: 1, name: "Sarah K.", points: 2450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", trend: "up" },
    { rank: 2, name: "Mike R.", points: 1890, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", trend: "same" },
    { rank: 3, name: "Alex (You)", points: 1200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", trend: "up" },
    { rank: 4, name: "Jessica T.", points: 1150, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica", trend: "down" },
    { rank: 5, name: "Tom H.", points: 980, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", trend: "up" },
]

const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export function CommunityTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Feed Section */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Create Post */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0 overflow-hidden">
                             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="You" />
                        </div>
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="What's on your mind? Ask a question or share an idea..." 
                                className="w-full bg-slate-50 border-0 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 mb-3"
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                     <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-500 text-xs font-bold hover:bg-slate-100">
                                        <Hash className="w-3 h-3" /> Add Topic
                                     </button>
                                </div>
                                <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {["All Posts", "Questions", "Resources", "Discussion"].map((filter, i) => (
                            <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                i === 0 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100 placeholder:shadow-sm" 
                                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                            }`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                        <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-full bg-white border border-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-40" />
                    </div>
                </div>

                {/* Posts Feed */}
                {posts.map((post) => (
                    <motion.div 
                        key={post.id} 
                        variants={itemVariants}
                        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                    <img src={post.avatar} alt={post.author} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{post.author}</h4>
                                    <p className="text-xs text-slate-400 font-medium">{post.role} • {post.time}</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-2 mb-6">
                            {post.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex gap-6">
                                <button className={`flex items-center gap-2 text-sm font-bold transition-colors ${post.hasLiked ? 'text-rose-500' : 'text-slate-500 hover:text-slate-700'}`}>
                                    <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} /> {post.likes}
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                                    <MessageSquare className="w-4 h-4" /> {post.comments}
                                </button>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Right Column: Leaderboard & Topics */}
            <div className="lg:col-span-4 space-y-8">
                 <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-bold text-slate-900">Leaderboard</h3>
                         </div>
                        <span className="text-xs font-bold text-slate-400">Weekly</span>
                    </div>

                    <div className="space-y-4">
                        {leaderboard.map((user, i) => (
                            <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl ${user.rank === 3 ? 'bg-emerald-50 border border-emerald-100 ring-1 ring-emerald-200' : 'hover:bg-slate-50'} transition-all`}>
                                <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${
                                    user.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                                    user.rank === 2 ? 'bg-slate-100 text-slate-700' :
                                    user.rank === 3 ? 'bg-orange-100 text-orange-700' : 'text-slate-400'
                                }`}>
                                    {user.rank}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                    <img src={user.avatar} alt={user.name} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900">{user.name}</h4>
                                    <p className="text-xs font-medium text-slate-400">{user.points} XP</p>
                                </div>
                                {user.rank <= 3 && <Medal className={`w-4 h-4 ${
                                    user.rank === 1 ? 'text-yellow-500' : 
                                    user.rank === 2 ? 'text-slate-400' :
                                    'text-orange-500'
                                }`} />}
                            </div>
                        ))}
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200">
                    <h3 className="text-xl font-bold mb-2">Weekly Challenge</h3>
                    <p className="text-indigo-100 text-sm font-medium mb-6">Complete 3 peer reviews to earn the "Mentor" badge and 500 XP.</p>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex -space-x-3">
                            {[1,2,3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-indigo-600" />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-indigo-200">+124 joined</span>
                    </div>

                    <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
                        Join Challenge
                    </button>
                 </motion.div>
            </div>

        </div>
    )
}
