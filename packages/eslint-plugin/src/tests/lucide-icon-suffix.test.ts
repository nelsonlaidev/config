import { RuleTester } from 'eslint'
import { describe, expect, it } from 'vitest'

import { lucideIconSuffix } from '../rules/lucide-icon-suffix'

const ruleTester = new RuleTester()

describe('lucide-icon-suffix', () => {
  it('should enforce Icon suffix for lucide-react imports', () => {
    expect(() => {
      ruleTester.run('lucide-icon-suffix', lucideIconSuffix, {
        valid: [
          // Already using Icon suffix
          `import { HomeIcon } from 'lucide-react'`,
          `import { HomeIcon, SearchIcon } from 'lucide-react'`,

          // Non-icon exports should be allowed
          `import { createLucideIcon } from 'lucide-react'`,
          `import { LucideIcon } from 'lucide-react'`,
          `import { LucideProps } from 'lucide-react'`,
          `import { icons } from 'lucide-react'`,

          // Imports from other packages should not be affected
          `import { Home } from 'other-package'`,
          `import { Search } from '@some/package'`,

          // Default imports are fine
          `import lucide from 'lucide-react'`,

          // Mixed valid imports
          `import { HomeIcon, createLucideIcon } from 'lucide-react'`,
        ],
        invalid: [
          {
            code: `import { Home } from 'lucide-react'`,
            output: `import { HomeIcon } from 'lucide-react'`,
            errors: [{ messageId: 'useSuffixed', data: { name: 'Home', suffixed: 'HomeIcon' } }],
          },
          {
            code: `import { Home, Search } from 'lucide-react'`,
            output: `import { HomeIcon, SearchIcon } from 'lucide-react'`,
            errors: [
              { messageId: 'useSuffixed', data: { name: 'Home', suffixed: 'HomeIcon' } },
              { messageId: 'useSuffixed', data: { name: 'Search', suffixed: 'SearchIcon' } },
            ],
          },
          {
            code: `import { Home, SearchIcon } from 'lucide-react'`,
            output: `import { HomeIcon, SearchIcon } from 'lucide-react'`,
            errors: [{ messageId: 'useSuffixed', data: { name: 'Home', suffixed: 'HomeIcon' } }],
          },
          {
            code: `import { Home as MyHome } from 'lucide-react'`,
            output: `import { HomeIcon as MyHome } from 'lucide-react'`,
            errors: [{ messageId: 'useSuffixed', data: { name: 'Home', suffixed: 'HomeIcon' } }],
          },
          {
            code: `import { Home, createLucideIcon } from 'lucide-react'`,
            output: `import { HomeIcon, createLucideIcon } from 'lucide-react'`,
            errors: [{ messageId: 'useSuffixed', data: { name: 'Home', suffixed: 'HomeIcon' } }],
          },
        ],
      })
    }).not.toThrow()
  })
})
