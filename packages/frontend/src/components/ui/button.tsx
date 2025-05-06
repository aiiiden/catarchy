import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classname';

const buttonVariants = cva('cursor-pointer flex justify-center items-center', {
  variants: {
    variant: {
      primary:
        'bg-primary text-white hover:bg-primary-light not-disabled:hover:text-primary disabled:bg-primary/60 disabled:cursor-not-allowed',
    },
    size: {
      base: 'min-h-12 px-6 rounded-md',
      lg: 'min-h-16 px-8 rounded-lg font-bold text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'base',
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
