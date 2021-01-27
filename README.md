# Viinalaskuri

This app calculates booze total volume and total prices from user input. This repo is hosted at https://viinalaskuri.web.app

## TODO

basically everything, including this readme

- <del>Add + and - buttons to add more rows</del>.
- Reorder and resize input fields to a row.
- Add more fields and calculations.
- Clean up the App.tsx by splitting it to smaller modules
- Add more comments.
- Add more error checking and tell user where the error is.
- Implement save-button (firestore)

## issues

- [x] <del>subtotal does not update to reduced state yet</del>

## Changelog

[2021-01-27]

- Extracted Form to its own module
- Subtotal is now added to state by using `useMemo` and `useEffect`

[2021-01-26]

- Published first content
