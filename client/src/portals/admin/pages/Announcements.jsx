import React, { useState } from 'react';
import { CirclePlus, Pencil, Trash2, ChevronDown, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';

const initialAnnouncements = [
  {
    id: 1,
    title: 'New Course: Advanced JavaScript',
    content:
      'We are thrilled to announce the launch of our new "Advanced JavaScript" course. This course...',
    status: 'Published',
    date: 'Oct 26, 2023',
    author: 'Admin',
  },
  {
    id: 2,
    title: 'Scheduled Maintenance',
    content:
      'Please be advised that the student portal will be temporarily unavailable for scheduled...',
    status: 'Draft',
    date: 'Oct 25, 2023',
    author: 'Admin',
  },
  {
    id: 3,
    title: 'Welcome to the New Portal!',
    content:
      "Welcome to the new and improved Code2Dbg Student Portal! We've redesigned the experience to make i...",
    status: 'Published',
    date: 'Sep 15, 2023',
    author: 'Admin',
  },
];

export default function Announcements() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Published');
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('Latest');

  const handlePublish = () => {
    if (!title || !content) return;
    setAnnouncements([
      ...announcements,
      {
        id: announcements.length + 1,
        title,
        content,
        status,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        author: 'Admin',
      },
    ]);
    setTitle('');
    setContent('');
    setStatus('Published');
  };

  const handleEdit = id => {
    console.log('Edit announcement:', id);
  };

  const handleDelete = id => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const filteredAnnouncements = announcements.filter(a =>
    filterStatus === 'All Status' ? true : a.status === filterStatus,
  );

  return (
    <div className="flex-1 overflow-y-auto p-8 text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Manage Announcements</h1>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
          <CirclePlus className="w-5 h-5" />
          <span className="font-medium text-base">Add New</span>
        </Button>
      </div>

      {/* New Announcement Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="font-bold text-lg mb-5">Create a New Announcement</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-blue-400"
              placeholder="Enter announcement title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-40">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between">
                  {status}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem onClick={() => setStatus('Published')}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus('Draft')}>Draft</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 min-h-[80px] focus:outline-blue-400"
            placeholder="Write your announcement here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <Button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-700">
          Publish Announcement
        </Button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {filterStatus}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('All Status')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Published')}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Draft')}>Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Sort by: {sortBy}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('Latest')}>Latest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Oldest')}>Oldest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Title')}>Title</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Existing Announcements */}
      <h2 className="font-bold text-lg mb-4">Existing Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredAnnouncements.map(a => (
          <div key={a.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="font-semibold">{a.title}</div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-xs rounded-lg font-semibold 
                  ${
                    a.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {a.status}
                </span>

                {/* Dropdown Menu for Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(a.id)}>
                      <Pencil size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-4 line-clamp-3">{a.content}</div>
            <div className="text-xs text-gray-500 mt-auto pt-2">
              <span>
                Posted by {a.author} on {a.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
