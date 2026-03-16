import { RuleTester } from 'eslint'
import { describe, expect, it } from 'vitest'

import { lucidePreferTrash2Icon } from '@/rules/lucide-prefer-trash2-icon'

const ruleTester = new RuleTester()

describe('lucide-prefer-trash2-icon', () => {
  it('should prefer Trash2Icon by default', () => {
    expect(() => {
      ruleTester.run('lucide-prefer-trash2-icon', lucidePreferTrash2Icon, {
        valid: [
          `import { Trash2Icon } from 'lucide-react'`,
          `import { HomeIcon } from 'lucide-react'`,
          `import { TrashIcon } from 'other-package'`,
        ],
        invalid: [
          {
            code: `import { TrashIcon } from 'lucide-react'`,
            output: `import { Trash2Icon } from 'lucide-react'`,
            errors: [{ messageId: 'preferIcon', data: { preferred: 'Trash2Icon', forbidden: 'TrashIcon' } }],
          },
          {
            code: `import { TrashIcon as DeleteIcon } from 'lucide-react'`,
            output: `import { Trash2Icon as DeleteIcon } from 'lucide-react'`,
            errors: [{ messageId: 'preferIcon', data: { preferred: 'Trash2Icon', forbidden: 'TrashIcon' } }],
          },
        ],
      })
    }).not.toThrow()
  })

  it('should prefer TrashIcon when configured', () => {
    expect(() => {
      ruleTester.run('lucide-prefer-trash2-icon', lucidePreferTrash2Icon, {
        valid: [
          {
            code: `import { TrashIcon } from 'lucide-react'`,
            options: [{ preferred: 'TrashIcon' }],
          },
        ],
        invalid: [
          {
            code: `import { Trash2Icon } from 'lucide-react'`,
            output: `import { TrashIcon } from 'lucide-react'`,
            options: [{ preferred: 'TrashIcon' }],
            errors: [{ messageId: 'preferIcon', data: { preferred: 'TrashIcon', forbidden: 'Trash2Icon' } }],
          },
        ],
      })
    }).not.toThrow()
  })
})
