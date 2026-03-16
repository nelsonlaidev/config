import { RuleTester } from 'eslint'
import { describe, expect, it } from 'vitest'

import { lucidePreferLoaderIcon } from '../lucide-prefer-loader-icon'

const ruleTester = new RuleTester()

describe('lucide-prefer-loader-icon', () => {
  it('should prefer LoaderIcon by default', () => {
    expect(() => {
      ruleTester.run('lucide-prefer-loader-icon', lucidePreferLoaderIcon, {
        valid: [
          `import { LoaderIcon } from 'lucide-react'`,
          `import { HomeIcon } from 'lucide-react'`,
          `import { Loader2Icon } from 'other-package'`,
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
        ],
      })
    }).not.toThrow()
  })

  it('should prefer Loader2Icon when configured', () => {
    expect(() => {
      ruleTester.run('lucide-prefer-loader-icon', lucidePreferLoaderIcon, {
        valid: [
          {
            code: `import { Loader2Icon } from 'lucide-react'`,
            options: [{ preferred: 'Loader2Icon' }],
          },
        ],
        invalid: [
          {
            code: `import { LoaderIcon } from 'lucide-react'`,
            output: `import { Loader2Icon } from 'lucide-react'`,
            options: [{ preferred: 'Loader2Icon' }],
            errors: [{ messageId: 'preferIcon', data: { preferred: 'Loader2Icon', forbidden: 'LoaderIcon' } }],
          },
        ],
      })
    }).not.toThrow()
  })
})
