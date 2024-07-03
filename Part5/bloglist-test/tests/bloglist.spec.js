const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'Salainen123!',
      },
    })

    await request.post('/api/users', {
      data: {
        name: 'Jep Riazonda',
        username: 'jepriaz',
        password: 'Salainen123!',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByTestId('loginForm')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Salainen123!')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Salainen')

      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Salainen123!')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'New blog for the exercise',
        'Me Mine',
        'www.itsme123.com'
      )

      await expect(
        page.getByText('New blog for the exercise Me Mine')
      ).toBeVisible()
    })

    describe('When there are blogs created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'New blog to test likes',
          'Me Mine',
          'www.itsme123.com'
        )
      })

      test('the blog can be liked', async ({ page }) => {
        const parentElement = await page
          .getByText('New blog to test likes Me Mine')
          .locator('..')

        await parentElement.getByRole('button', { name: 'view' }).click()
        await parentElement.getByRole('button', { name: 'like' }).click()
        await expect(parentElement.getByText('likes 1')).toBeVisible()
      })

      test('the user who added the blog can delete the blog', async ({
        page,
      }) => {
        page.on('dialog', async (dialog) => {
          expect(console.log(`Dialog message: ${dialog.message()}`))
          await dialog.accept()
        })

        const parentElement = await page
          .getByText('New blog to test likes Me Mine')
          .locator('..')

        await parentElement.getByRole('button', { name: 'view' }).click()
        await parentElement.getByText('Matti Luukkainen').waitFor()
        await parentElement.getByRole('button', { name: 'remove' }).click()

        await expect(
          page.getByText('New blog to test likes Me Mine')
        ).not.toBeVisible()
      })

      describe('When other user is logged in', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await loginWith(page, 'jepriaz', 'Salainen123!')
          await createBlog(
            page,
            'New blog to different user',
            'Not Mine',
            'www.notme123.com'
          )
        })

        test("the user who added the blog sees the blog's delete button", async ({
          page,
        }) => {
          const currentUserBlog = await page
            .getByText('New blog to different user Not Mine')
            .locator('..')

          const otherUserBlog = await page
            .getByText('New blog to test likes Me Mine')
            .locator('..')

          await currentUserBlog.getByRole('button', { name: 'view' }).click()
          await otherUserBlog.getByRole('button', { name: 'view' }).click()

          expect(
            currentUserBlog.getByRole('button', { name: 'remove' })
          ).toBeVisible()
          expect(
            otherUserBlog.getByRole('button', { name: 'remove' })
          ).not.toBeVisible()
        })

        test('the blogs are arranged in the order according to the likes', async ({
          page,
        }) => {
          await createBlog(
            page,
            'New blog two likes',
            'Not Mine',
            'www.notme123.com'
          )
          await createBlog(
            page,
            'New blog three likes',
            'Not Mine',
            'www.notme123.com'
          )
          await createBlog(
            page,
            'New blog four likes',
            'Not Mine',
            'www.notme123.com'
          )
          const blogTwoLikes = await page
            .getByText('New blog two likes Not Mine')
            .locator('..')
          await blogTwoLikes.getByRole('button', { name: 'view' }).click()
          await blogTwoLikes.getByRole('button', { name: 'like' }).click()
          await blogTwoLikes.getByRole('button', { name: 'like' }).click()

          const blogThreeLikes = await page
            .getByText('New blog three likes Not Mine')
            .locator('..')
          await blogThreeLikes.getByRole('button', { name: 'view' }).click()
          await blogThreeLikes.getByRole('button', { name: 'like' }).click()
          await blogThreeLikes.getByRole('button', { name: 'like' }).click()
          await blogThreeLikes.getByRole('button', { name: 'like' }).click()

          const blogFourLikes = await page
            .getByText('New blog four likes Not Mine')
            .locator('..')
          await blogFourLikes.getByRole('button', { name: 'view' }).click()
          await blogFourLikes.getByRole('button', { name: 'like' }).click()
          await blogFourLikes.getByRole('button', { name: 'like' }).click()
          await blogFourLikes.getByRole('button', { name: 'like' }).click()
          await blogFourLikes.getByRole('button', { name: 'like' }).click()

          await expect(page.locator('.likesCount')).toHaveText([
            'likes 4 like',
            'likes 3 like',
            'likes 2 like',
            'likes 0 like',
            'likes 0 like',
          ])
        })
      })
    })
  })
})
