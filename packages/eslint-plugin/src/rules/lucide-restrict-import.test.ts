import { RuleTester } from '@typescript-eslint/rule-tester'

import { lucideRestrictImport } from './lucide-restrict-import'

const ruleTester = new RuleTester()

ruleTester.run('lucide-restrict-import', lucideRestrictImport, {
  valid: [
    // Default restrictions: LoaderIcon preferred over Loader2Icon, Trash2Icon preferred over TrashIcon
    `import { LoaderIcon } from 'lucide-react'`,
    `import { Trash2Icon } from 'lucide-react'`,
    `import { HomeIcon } from 'lucide-react'`,
    `import { Loader2Icon } from 'other-package'`,
    `import { TrashIcon } from 'other-package'`,

    // Custom restrictions
    {
      code: `import { HomeIcon } from 'lucide-react'`,
      options: [{ restrictions: [{ name: 'SearchIcon', preferred: 'Search2Icon' }] }],
    },

    // Empty restrictions
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      options: [{ restrictions: [] }],
    },
  ],
  invalid: [
    // Default: Loader2Icon -> LoaderIcon
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      output: `import { LoaderIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderIcon', forbidden: 'Loader2Icon' } }],
    },
    // Default: TrashIcon -> Trash2Icon
    {
      code: `import { TrashIcon } from 'lucide-react'`,
      output: `import { Trash2Icon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'Trash2Icon', forbidden: 'TrashIcon' } }],
    },
    // Renamed import
    {
      code: `import { Loader2Icon as SpinnerIcon } from 'lucide-react'`,
      output: `import { LoaderIcon as SpinnerIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderIcon', forbidden: 'Loader2Icon' } }],
    },
    // Custom restrictions
    {
      code: `import { SearchIcon } from 'lucide-react'`,
      output: `import { Search2Icon } from 'lucide-react'`,
      options: [{ restrictions: [{ name: 'SearchIcon', preferred: 'Search2Icon' }] }],
      errors: [{ messageId: 'preferIcon', data: { preferred: 'Search2Icon', forbidden: 'SearchIcon' } }],
    },
    // Custom message
    {
      code: `import { SearchIcon } from 'lucide-react'`,
      output: `import { Search2Icon } from 'lucide-react'`,
      options: [
        { restrictions: [{ name: 'SearchIcon', preferred: 'Search2Icon', message: 'Use Search2Icon instead.' }] },
      ],
      errors: [{ messageId: 'preferIconCustom', data: { message: 'Use Search2Icon instead.' } }],
    },
    // Multiple restricted imports in one declaration
    {
      code: `import { Loader2Icon, TrashIcon } from 'lucide-react'`,
      output: `import { LoaderIcon, Trash2Icon } from 'lucide-react'`,
      errors: [
        { messageId: 'preferIcon', data: { preferred: 'LoaderIcon', forbidden: 'Loader2Icon' } },
        { messageId: 'preferIcon', data: { preferred: 'Trash2Icon', forbidden: 'TrashIcon' } },
      ],
    },
  ],
})
