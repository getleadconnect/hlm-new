import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Paperclip,
  Smile,
  AtSign,
  Hash,
  MoreHorizontal,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ChevronDown
} from 'lucide-react';
import { Button } from './button';
import { Separator } from './separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { DropdownMenu, DropdownMenuItem } from './dropdown-menu';

// Toolbar button component
const ToolbarButton = ({ 
  icon: Icon, 
  tooltip, 
  active = false, 
  onClick, 
  disabled = false,
  className,
  ...props 
}) => {
  const button = (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

// Toolbar separator
const ToolbarSeparator = () => (
  <Separator orientation="vertical" className="mx-1 h-6" />
);

// Editor toolbar component
const EditorToolbar = ({ 
  value = {},
  onChange,
  onAction,
  className,
  features = {
    formatting: true,
    lists: true,
    alignment: true,
    links: true,
    mentions: true,
    attachments: true,
    emoji: true,
    undo: true
  },
  ...props 
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [showLinkDialog, setShowLinkDialog] = React.useState(false);

  const handleAction = (action, data = {}) => {
    if (onAction) {
      onAction(action, data);
    }
  };

  const formatOptions = [
    { value: 'paragraph', label: 'Paragraph', icon: Type },
    { value: 'heading1', label: 'Heading 1' },
    { value: 'heading2', label: 'Heading 2' },
    { value: 'heading3', label: 'Heading 3' },
    { value: 'quote', label: 'Quote', icon: Quote },
    { value: 'code', label: 'Code Block', icon: Code }
  ];

  return (
    <div 
      className={cn(
        "flex items-center flex-wrap gap-1 p-2 border-b bg-background",
        className
      )}
      {...props}
    >
      {/* Text format dropdown */}
      {features.formatting && (
        <>
          <DropdownMenu
            trigger={
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Type className="h-4 w-4" />
                <span className="text-sm">Paragraph</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            }
          >
            {formatOptions.map(option => (
              <DropdownMenuItem key={option.value} onClick={() => handleAction('format', option.value)}>
                <div className="flex items-center gap-2">
                  {option.icon && <option.icon className="h-4 w-4" />}
                  <span>{option.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
          
          <ToolbarSeparator />
        </>
      )}

      {/* Text formatting */}
      {features.formatting && (
        <>
          <ToolbarButton
            icon={Bold}
            tooltip="Bold (Ctrl+B)"
            active={value.bold}
            onClick={() => handleAction('bold')}
          />
          <ToolbarButton
            icon={Italic}
            tooltip="Italic (Ctrl+I)"
            active={value.italic}
            onClick={() => handleAction('italic')}
          />
          <ToolbarButton
            icon={Underline}
            tooltip="Underline (Ctrl+U)"
            active={value.underline}
            onClick={() => handleAction('underline')}
          />
          <ToolbarButton
            icon={Strikethrough}
            tooltip="Strikethrough"
            active={value.strikethrough}
            onClick={() => handleAction('strikethrough')}
          />
          
          <ToolbarSeparator />
        </>
      )}

      {/* Lists */}
      {features.lists && (
        <>
          <ToolbarButton
            icon={List}
            tooltip="Bullet List"
            active={value.bulletList}
            onClick={() => handleAction('bulletList')}
          />
          <ToolbarButton
            icon={ListOrdered}
            tooltip="Numbered List"
            active={value.orderedList}
            onClick={() => handleAction('orderedList')}
          />
          
          <ToolbarSeparator />
        </>
      )}

      {/* Alignment */}
      {features.alignment && (
        <>
          <ToolbarButton
            icon={AlignLeft}
            tooltip="Align Left"
            active={value.align === 'left'}
            onClick={() => handleAction('align', 'left')}
          />
          <ToolbarButton
            icon={AlignCenter}
            tooltip="Align Center"
            active={value.align === 'center'}
            onClick={() => handleAction('align', 'center')}
          />
          <ToolbarButton
            icon={AlignRight}
            tooltip="Align Right"
            active={value.align === 'right'}
            onClick={() => handleAction('align', 'right')}
          />
          <ToolbarButton
            icon={AlignJustify}
            tooltip="Justify"
            active={value.align === 'justify'}
            onClick={() => handleAction('align', 'justify')}
          />
          
          <ToolbarSeparator />
        </>
      )}

      {/* Links and media */}
      {features.links && (
        <>
          <ToolbarButton
            icon={Link}
            tooltip="Insert Link"
            onClick={() => handleAction('link')}
          />
          <ToolbarButton
            icon={Image}
            tooltip="Insert Image"
            onClick={() => handleAction('image')}
          />
          
          <ToolbarSeparator />
        </>
      )}

      {/* Mentions and hashtags */}
      {features.mentions && (
        <>
          <ToolbarButton
            icon={AtSign}
            tooltip="Mention Someone"
            onClick={() => handleAction('mention')}
          />
          <ToolbarButton
            icon={Hash}
            tooltip="Add Tag"
            onClick={() => handleAction('tag')}
          />
          
          <ToolbarSeparator />
        </>
      )}

      {/* Attachments and emoji */}
      <div className="flex items-center gap-1 ml-auto">
        {features.attachments && (
          <ToolbarButton
            icon={Paperclip}
            tooltip="Attach File"
            onClick={() => handleAction('attach')}
          />
        )}
        
        {features.emoji && (
          <ToolbarButton
            icon={Smile}
            tooltip="Insert Emoji"
            onClick={() => handleAction('emoji')}
          />
        )}
        
        {features.undo && (
          <>
            <ToolbarSeparator />
            <ToolbarButton
              icon={Undo}
              tooltip="Undo (Ctrl+Z)"
              onClick={() => handleAction('undo')}
              disabled={!value.canUndo}
            />
            <ToolbarButton
              icon={Redo}
              tooltip="Redo (Ctrl+Y)"
              onClick={() => handleAction('redo')}
              disabled={!value.canRedo}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Minimal toolbar for simple text inputs
const MinimalToolbar = ({ onAction, className, ...props }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-1 p-1 border rounded-md bg-background",
        className
      )}
      {...props}
    >
      <ToolbarButton
        icon={Bold}
        tooltip="Bold"
        onClick={() => onAction('bold')}
        className="h-7 w-7"
      />
      <ToolbarButton
        icon={Italic}
        tooltip="Italic"
        onClick={() => onAction('italic')}
        className="h-7 w-7"
      />
      <ToolbarButton
        icon={Link}
        tooltip="Link"
        onClick={() => onAction('link')}
        className="h-7 w-7"
      />
      <ToolbarSeparator />
      <ToolbarButton
        icon={AtSign}
        tooltip="Mention"
        onClick={() => onAction('mention')}
        className="h-7 w-7"
      />
      <ToolbarButton
        icon={Smile}
        tooltip="Emoji"
        onClick={() => onAction('emoji')}
        className="h-7 w-7"
      />
    </div>
  );
};

// Emoji picker component
const EmojiPicker = ({ onSelect, className }) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
    '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
    '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
    '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔',
    '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵',
    '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕',
    '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
    '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓',
    '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀',
    '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '👍',
    '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
    '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'
  ];

  return (
    <div className={cn("grid grid-cols-10 gap-1 p-2 max-w-sm", className)}>
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className="h-8 w-8 flex items-center justify-center hover:bg-accent rounded text-lg"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

// Mention suggestions component
const MentionSuggestions = ({ 
  query, 
  suggestions = [], 
  onSelect,
  className 
}) => {
  const filteredSuggestions = suggestions.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredSuggestions.length === 0) return null;

  return (
    <div className={cn(
      "absolute z-50 mt-1 w-64 rounded-md border bg-popover p-1 shadow-md",
      className
    )}>
      {filteredSuggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          className="flex items-center gap-2 w-full p-2 text-left text-sm rounded hover:bg-accent"
          onClick={() => onSelect(suggestion)}
        >
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
            {suggestion.avatar || suggestion.name.charAt(0).toUpperCase()}
          </div>
          <span>{suggestion.name}</span>
        </button>
      ))}
    </div>
  );
};

export { 
  EditorToolbar, 
  MinimalToolbar, 
  ToolbarButton, 
  ToolbarSeparator,
  EmojiPicker,
  MentionSuggestions 
};