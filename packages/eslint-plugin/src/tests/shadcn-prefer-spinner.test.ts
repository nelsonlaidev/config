import { RuleTester } from 'eslint'
import { describe, expect, it } from 'vitest'

import { shadcnPreferSpinner } from '../rules/shadcn-prefer-spinner'

const ruleTester = new RuleTester()

describe('shadcn-prefer-spinner', () => {
  it('should forbid LoaderIcon and Loader2Icon from lucide-react', () => {
    expect(() => {
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
            output: `import { Spinner } from '@/components/ui/spinner'\n`,
            errors: [
              {
                messageId: 'preferSpinner',
                data: { name: 'LoaderIcon', importSource: '@/components/ui/spinner' },
              },
            ],
          },
          {
            code: `import { Loader2Icon } from 'lucide-react'`,
            output: `import { Spinner } from '@/components/ui/spinner'\n`,
            errors: [
              {
                messageId: 'preferSpinner',
                data: { name: 'Loader2Icon', importSource: '@/components/ui/spinner' },
              },
            ],
          },
          {
            code: `import { HomeIcon, LoaderIcon, Loader2Icon } from 'lucide-react'`,
            output: `import { Spinner } from '@/components/ui/spinner'\nimport { HomeIcon, Loader2Icon } from 'lucide-react'`,
            errors: [
              {
                messageId: 'preferSpinner',
                data: { name: 'LoaderIcon', importSource: '@/components/ui/spinner' },
              },
              {
                messageId: 'preferSpinner',
                data: { name: 'Loader2Icon', importSource: '@/components/ui/spinner' },
              },
            ],
          },
        ],
      })
    }).not.toThrow()
  })

  it('should support custom import source', () => {
    expect(() => {
      ruleTester.run('shadcn-prefer-spinner', shadcnPreferSpinner, {
        valid: [
          {
            code: `import { HomeIcon } from 'lucide-react'`,
            options: [{ importSource: '~/components/spinner' }],
          },
        ],
        invalid: [
          {
            code: `import { LoaderIcon } from 'lucide-react'`,
            output: `import { Spinner } from '~/components/spinner'\n`,
            options: [{ importSource: '~/components/spinner' }],
            errors: [
              {
                messageId: 'preferSpinner',
                data: { name: 'LoaderIcon', importSource: '~/components/spinner' },
              },
            ],
          },
        ],
      })
    }).not.toThrow()
  })
})
