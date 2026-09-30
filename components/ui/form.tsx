import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
import { Label } from './label';
import { cn } from '@/lib/utils';

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-4', className)} noValidate {...props}>
    {children}
  </form>
));

Form.displayName = 'Form';

const FormFieldContext = React.createContext<{ name: string } | null>(null);

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  ...props
}: { name: FieldPath<TFieldValues> } & Omit<
  React.ComponentPropsWithoutRef<typeof Controller<TFieldValues>>,
  'name'
>) => (
  <FormFieldContext.Provider value={{ name }}>
    <Controller<TFieldValues> name={name} {...props} />
  </FormFieldContext.Provider>
);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
);

FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return <Label ref={ref} className={className} htmlFor={formItemId} {...props} />;
});

FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { formItemId, formDescriptionId, error } = useFormField();
    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={formDescriptionId}
        aria-invalid={!!error}
        className={cn('form-control', className)}
        {...props}
      />
    );
  }
);

FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (
      <p ref={ref} id={formDescriptionId} className={cn('text-sm text-muted-foreground', className)} {...props} />
    );
  }
);

FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { formMessageId, error } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) return null;
    return (
      <p ref={ref} id={formMessageId} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {body}
      </p>
    );
  }
);

FormMessage.displayName = 'FormMessage';

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const form = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { getFieldState, formState } = form as UseFormReturn<FieldValues>;
  const fieldState = getFieldState(fieldContext.name, formState);

  const id = React.useId();
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    ...fieldState
  };
}

export { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField, useFormField };
