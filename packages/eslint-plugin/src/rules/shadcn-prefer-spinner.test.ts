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
      code: `import { LoaderIcon } from 'lucide-react'\nconst App = () => <LoaderIcon className="animate-spin" />`,
      errors: [{ messageId: 'preferSpinner' }],
    },
    {
      code: `import { HomeIcon, Loader2Icon } from 'lucide-react'\nconst App = () => <Loader2Icon />`,
      errors: [{ messageId: 'preferSpinner' }],
    },
  ],
})
