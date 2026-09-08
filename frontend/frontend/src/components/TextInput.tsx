import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function TextInput({ id, label, ...props }: TextInputProps) {
  return (
    <label className="field" htmlFor={id}>
      {label}
      <input id={id} {...props} />
    </label>
  )
}
