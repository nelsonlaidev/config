import { RuleTester } from '@typescript-eslint/rule-tester'

import { lucidePreferLoaderIcon } from './lucide-prefer-loader-icon'

const ruleTester = new RuleTester()

ruleTester.run('lucide-prefer-loader-icon', lucidePreferLoaderIcon, {
  valid: [
    `import { LoaderIcon } from 'lucide-react'`,
    `import { HomeIcon } from 'lucide-react'`,
    `import { Loader2Icon } from 'other-package'`,
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      options: [{ preferred: 'Loader2Icon' }],
    },
  ],
  invalid: [
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      output: `import { LoaderIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderIcon', forbidden: 'Loader2Icon' } }],
    },
    {
      code: `import { Loader2Icon as SpinnerIcon } from 'lucide-react'`,
      output: `import { LoaderIcon as SpinnerIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderIcon', forbidden: 'Loader2Icon' } }],
    },
    {
      code: `import { LoaderIcon } from 'lucide-react'`,
      output: `import { Loader2Icon } from 'lucide-react'`,
      options: [{ preferred: 'Loader2Icon' }],
      errors: [{ messageId: 'preferIcon', data: { preferred: 'Loader2Icon', forbidden: 'LoaderIcon' } }],
    },
  ],
})
