import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { FieldLabel } from '@/common/components/ui/field';

export const CourseLinkManager = ({ label, links, onAdd, onUpdate, onRemove, placeholder }) => {
  return (
    <div>
      <FieldLabel className="text-zinc-300 font-medium mb-3">{label}</FieldLabel>
      <div className="space-y-2">
        {links.map((link, linkIndex) => (
          <div key={linkIndex} className="flex items-center gap-3">
            <Input
              value={link}
              onChange={e => onUpdate(linkIndex, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
            {links.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(linkIndex)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onAdd}
        className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label.includes('Text') ? 'Text' : 'Video'} Link
      </Button>
    </div>
  );
};
