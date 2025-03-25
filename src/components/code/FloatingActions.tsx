import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { SignedIn } from '@clerk/clerk-react';

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <SignedIn>

        <Link
          to="/codes/new"
          className={cn(
            "w-12 h-12 rounded-full bg-primary text-primary-content",
            "flex items-center justify-center shadow-lg",
            "hover:scale-110 active:scale-95 transition-all duration-200"
          )}
          title="Add New Code Snippet"
        >
          <Plus size={24} />
        </Link>
      </SignedIn>
      <Link
        to="/codes"
        className={cn(
          "w-12 h-12 rounded-full bg-accent text-accent-content",
          "flex items-center justify-center shadow-lg",
          "hover:scale-110 active:scale-95 transition-all duration-200"
        )}
        title="Search Code Snippets"
      >
        <Search size={24} />
      </Link>
    </div>
  );
};

export default FloatingActions;