import { IComment } from '@/interfaces';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

export default function Comment({ comments }: { comments: Array<IComment> }) {
  dayjs.extend(relativeTime);
  return (
    <div className="p-4 rounded-md border border-grey-dark bg-primary-2 flex flex-col gap-y-5 md:gap-y-8">
      <h1 className="font-bold">Comment</h1>
      <div className="flex flex-col gap-y-2">
        {comments.map((comment, index) => (
          <div className="flex items-start gap-x-3" key={index}>
            <div>
              <UserCircle size={40} />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <p className="font-bold">{comment.author}</p>
              <p className="text-xs text-gray-400">
                {dayjs(comment.updated_at).fromNow()}
              </p>
              <p className="text-xs leading-[1.7] text-gray-200">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
