## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
Follow instructions in the console to get the URL for viewing the result.

## Assumptions
- You use Vue 3 and not 2
- You use the generic version of Bootstrap rather than the Vue-specific version
- You use the NPM version of Bootstrap
- This was to be a desktop-only web page

## Additional Notes
1. In addition to documentation comments, there are a number of authors note comments denoted by three asterisks (***) at the start.
2. I don't know if you have a package approval process or what that's like, so did my best to only use packages you are likely to have installed.
3. I could have done a number of runtime optimizations and maintainability optimizations, but tha seemed like it would be devoting too much time.
4. The 'Type' field in the form isn't a dropdown. My initial search didn't come up with any reputable multi-select dropdowns I could use, and making my own was well beyond the scope of this task.
5. The type narrowing for the 'type' property on a ticket isn't perfect. I tried to build that complicated type setup from memory but ran out of time when I went to test.
6. I didn't end up building validation due to time constraints, but if you know anything about my history, overly user-friendly forms are very much my thing.
7. I can make a much nicer UI than this, but only with fewer time constraints and better context for the final product.
