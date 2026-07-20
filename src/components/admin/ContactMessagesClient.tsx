'use client';

import { useState } from 'react';
import { Mail, MailOpen, Calendar, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { updateContactSubmissionStatusAction } from '@/lib/supabase/actions/mutations';

interface Submission {
    id: string;
    created_at: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
}

export default function ContactMessagesClient({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const toggleStatus = async (id: string, currentStatus: string) => {
        setUpdatingId(id);
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        const res = await updateContactSubmissionStatusAction(id, newStatus);
        if (res.success) {
            setSubmissions(prev => 
                prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
            );
        } else {
            alert('Det gick inte att uppdatera statusen.');
        }
        setUpdatingId(null);
    };

    const filteredSubmissions = submissions.filter(sub => {
        if (filter === 'unread') return sub.status === 'unread';
        if (filter === 'read') return sub.status === 'read';
        return true;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors -mb-[2px] ${
                        filter === 'all'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Alla meddelanden ({submissions.length})
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors -mb-[2px] ${
                        filter === 'unread'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Olästa ({submissions.filter(s => s.status === 'unread').length})
                </button>
                <button
                    onClick={() => setFilter('read')}
                    className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors -mb-[2px] ${
                        filter === 'read'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Lästa ({submissions.filter(s => s.status === 'read').length})
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden divide-y divide-gray-100">
                {filteredSubmissions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
                        Inga kontaktmeddelanden matchar valet.
                    </div>
                ) : (
                    filteredSubmissions.map(sub => {
                        const isExpanded = expandedId === sub.id;
                        const isUnread = sub.status === 'unread';

                        return (
                            <div 
                                key={sub.id} 
                                className={`transition-all duration-200 ${
                                    isUnread ? 'bg-rose-50/20 hover:bg-rose-50/40' : 'hover:bg-gray-50/50'
                                }`}
                            >
                                {/* Header / Summary row */}
                                <div 
                                    onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                                    className="p-6 flex items-center justify-between cursor-pointer select-none"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-center">
                                        {/* Status badge */}
                                        <div className="md:col-span-2 flex items-center gap-2">
                                            {isUnread ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                                                    Oläst
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                                                    Läst
                                                </span>
                                            )}
                                        </div>

                                        {/* Sender info */}
                                        <div className="md:col-span-3">
                                            <p className={`font-bold text-gray-900 ${isUnread ? 'text-charcoal-900' : 'text-gray-700'}`}>
                                                {sub.name}
                                            </p>
                                            <p className="text-xs text-gray-500 font-medium">{sub.email}</p>
                                        </div>

                                        {/* Subject */}
                                        <div className="md:col-span-4">
                                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 mb-1">
                                                {sub.subject}
                                            </span>
                                            <p className={`text-sm truncate max-w-xs ${isUnread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                                {sub.message}
                                            </p>
                                        </div>

                                        {/* Date */}
                                        <div className="md:col-span-3 flex items-center gap-2 text-gray-400 text-xs font-medium">
                                            <Calendar size={14} />
                                            {formatDate(sub.created_at)}
                                        </div>
                                    </div>

                                    {/* Action expand arrow */}
                                    <div className="ml-4 text-gray-400">
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>

                                {/* Expanded message details */}
                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100/50 space-y-4">
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-inner">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meddelande</h4>
                                            <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
                                                {sub.message}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                disabled={updatingId === sub.id}
                                                onClick={() => toggleStatus(sub.id, sub.status)}
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                                                    isUnread 
                                                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                                                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {isUnread ? (
                                                    <>
                                                        <MailOpen size={16} />
                                                        Markera som läst
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mail size={16} />
                                                        Markera som oläst
                                                    </>
                                                )}
                                            </button>
                                            <a 
                                                href={`mailto:${sub.email}?subject=Svar angående: ${sub.subject}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-rose-200 transition-colors"
                                            >
                                                Svara på e-post
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
