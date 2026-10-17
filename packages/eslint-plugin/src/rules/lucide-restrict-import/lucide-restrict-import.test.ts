import { RuleTester } from '@typescript-eslint/rule-tester'

import { lucideRestrictImport } from './lucide-restrict-import'

const ruleTester = new RuleTester()

ruleTester.run('lucide-restrict-import', lucideRestrictImport, {
  valid: [
    // Default restrictions: LoaderCircleIcon preferred over Loader2Icon and LoaderIcon, TrashIcon over Trash2Icon
    `import { LoaderCircleIcon } from 'lucide-react'`,
    `import { TrashIcon } from 'lucide-react'`,
    `import { HomeIcon } from 'lucide-react'`,
    `import { Loader2Icon } from 'other-package'`,
    `import { Trash2Icon } from 'other-package'`,

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
    // Default: Loader2Icon -> LoaderCircleIcon
    {
      code: `import { Loader2Icon } from 'lucide-react'`,
      output: `import { LoaderCircleIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderCircleIcon', forbidden: 'Loader2Icon' } }],
    },
    // Default: LoaderIcon -> LoaderCircleIcon
    {
      code: `import { LoaderIcon } from 'lucide-react'; const icon = LoaderIcon`,
      output: `import { LoaderCircleIcon } from 'lucide-react'; const icon = LoaderCircleIcon`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderCircleIcon', forbidden: 'LoaderIcon' } }],
    },
    // Default: Trash2Icon -> TrashIcon
    {
      code: `import { Trash2Icon } from 'lucide-react'`,
      output: `import { TrashIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'TrashIcon', forbidden: 'Trash2Icon' } }],
    },
    // Renamed import
    {
      code: `import { Loader2Icon as SpinnerIcon } from 'lucide-react'`,
      output: `import { LoaderCircleIcon as SpinnerIcon } from 'lucide-react'`,
      errors: [{ messageId: 'preferIcon', data: { preferred: 'LoaderCircleIcon', forbidden: 'Loader2Icon' } }],
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
      code: `import { Loader2Icon, Trash2Icon } from 'lucide-react'`,
      output: `import { LoaderCircleIcon, TrashIcon } from 'lucide-react'`,
      errors: [
        { messageId: 'preferIcon', data: { preferred: 'LoaderCircleIcon', forbidden: 'Loader2Icon' } },
        { messageId: 'preferIcon', data: { preferred: 'TrashIcon', forbidden: 'Trash2Icon' } },
      ],
    },
  ],
})
