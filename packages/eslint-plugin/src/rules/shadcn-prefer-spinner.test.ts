import { RuleTester } from '@typescript-eslint/rule-tester'

import { shadcnPreferSpinner } from './shadcn-prefer-spinner'

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
})

ruleTester.run('shadcn-prefer-spinner', shadcnPreferSpinner, {
  valid: [
    `import { Spinner } from '@/components/ui/spinner'`,
    `import { HomeIcon } from 'lucide-react'`,
    `import { LoaderIcon } from 'other-package'`,
    `import { Loader2Icon } from 'other-package'`,
    // Should not report when filename matches default ignore pattern
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'spinner.tsx',
    },
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      filename: 'spinner.tsx',
    },
    // Glob pattern matching
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'src/components/ui/spinner.tsx',
      options: [{ ignore: ['**/spinner.tsx'] }],
    },
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'src/components/ui/loading.tsx',
      options: [{ ignore: ['**/loading.tsx'] }],
    },
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'src/components/ui/spinner.tsx',
      options: [{ ignore: ['**/ui/*.tsx'] }],
    },
    // Windows-style path separators
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'src\\components\\ui\\spinner.tsx',
      options: [{ ignore: ['**/spinner.tsx'] }],
    },
  ],
  invalid: [
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferSpinner', data: { name: 'LoaderIcon' } }],
    },
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      errors: [{ messageId: 'preferSpinner', data: { name: 'Loader2Icon' } }],
    },
    {
      code: `import { HomeIcon, LoaderIcon, Loader2Icon } from 'lucide-react'`,
      errors: [
        { messageId: 'preferSpinner', data: { name: 'LoaderIcon' } },
        { messageId: 'preferSpinner', data: { name: 'Loader2Icon' } },
      ],
    },
    {
      code: `
        import { LoaderIcon } from 'lucide-react'
        const App = () => <LoaderIcon className="animate-spin" />
      `,
      errors: [{ messageId: 'preferSpinner' }],
    },
    {
      code: `
        import { HomeIcon, Loader2Icon } from 'lucide-react'
        const App = () => <Loader2Icon />
      `,
      errors: [{ messageId: 'preferSpinner' }],
    },
    // Not matching ignore pattern
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      filename: 'src/components/ui/loader.tsx',
      errors: [{ messageId: 'preferSpinner', data: { name: 'LoaderIcon' } }],
    },
  ],
})
