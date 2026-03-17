import { RuleTester } from '@typescript-eslint/rule-tester'

import { lucideIconSuffix } from './lucide-icon-suffix'

const ruleTester = new RuleTester()

ruleTester.run('lucide-icon-suffix', lucideIconSuffix, {
  valid: [
    // Already using Icon suffix (default: 'with')
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

    // Default imports
    `import lucide from 'lucide-react'`,

    // Mixed valid imports
    `import { HomeIcon, createLucideIcon } from 'lucide-react'`,

    // Without suffix option: already without suffix
    {
      code: `import { Home } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
    },
    {
      code: `import { Home, Search } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
    },
    {
      code: `import { Home, createLucideIcon } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
    },
  ],
  invalid: [
    {
      code: `import { Home } from 'lucide-react'`,
      output: `import { HomeIcon } from 'lucide-react'`,
      errors: [{ messageId: 'useSuffixed', data: { name: 'Home', expected: 'HomeIcon' } }],
    },
    {
      code: `import { Home, Search } from 'lucide-react'`,
      output: `import { HomeIcon, SearchIcon } from 'lucide-react'`,
      errors: [
        { messageId: 'useSuffixed', data: { name: 'Home', expected: 'HomeIcon' } },
        { messageId: 'useSuffixed', data: { name: 'Search', expected: 'SearchIcon' } },
      ],
    },
    {
      code: `import { Home, SearchIcon } from 'lucide-react'`,
      output: `import { HomeIcon, SearchIcon } from 'lucide-react'`,
      errors: [{ messageId: 'useSuffixed', data: { name: 'Home', expected: 'HomeIcon' } }],
    },
    {
      code: `import { Home as MyHome } from 'lucide-react'`,
      output: `import { HomeIcon as MyHome } from 'lucide-react'`,
      errors: [{ messageId: 'useSuffixed', data: { name: 'Home', expected: 'HomeIcon' } }],
    },
    {
      code: `import { Home, createLucideIcon } from 'lucide-react'`,
      output: `import { HomeIcon, createLucideIcon } from 'lucide-react'`,
      errors: [{ messageId: 'useSuffixed', data: { name: 'Home', expected: 'HomeIcon' } }],
    },
    {
      code: `import { HomeIcon } from 'lucide-react'`,
      output: `import { Home } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
      errors: [{ messageId: 'useUnsuffixed', data: { name: 'HomeIcon', expected: 'Home' } }],
    },
    {
      code: `import { HomeIcon, SearchIcon } from 'lucide-react'`,
      output: `import { Home, Search } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
      errors: [
        { messageId: 'useUnsuffixed', data: { name: 'HomeIcon', expected: 'Home' } },
        { messageId: 'useUnsuffixed', data: { name: 'SearchIcon', expected: 'Search' } },
      ],
    },
    {
      code: `import { HomeIcon as MyHome } from 'lucide-react'`,
      output: `import { Home as MyHome } from 'lucide-react'`,
      options: [{ suffix: 'without' }],
      errors: [{ messageId: 'useUnsuffixed', data: { name: 'HomeIcon', expected: 'Home' } }],
    },
  ],
})
