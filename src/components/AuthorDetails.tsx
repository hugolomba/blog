import type { Post } from '../types/types';

export default function AuthorDetails({ author }: { author: Post['author'] }) {
    return (
        <div className="flex flex-col gap-1 items-left mt-8 p-4 border-t border-gray-300 border-b">
            <img src={author.avatarImage} alt={author.name} className="inline-block w-15 h-15 rounded-full mr-2 object-cover" />
            <h4 className='text-xl text-gray-600 font-semibold mt-2'>Written by {author.name} {author.surname}</h4>
            <p className="text-gray-500">{author.bio}</p>

        </div>
    );
}
