# Intro
For this demo project, I have decided to use [Next.js](https://nextjs.org/). I wanted to try out server-side rendering and the use case seemed to be a perfect fit. The [nextchakra-starter](https://github.com/sozonome/nextchakra-starter) was used as a template for the project. I also prefer using TypeScript, it increases the quality of the codebase quite a bit.

## UI

As a component library, I have picked [Chakra UI](https://chakra-ui.com/). It is easy to use, supports modularity and accessibility.

## UX

The project has only 3 pages:

* Home page - you can navigate to upload and view pages from it.
* Upload page - it has an upload button that also supports drag-and-drop. When a user starts uploading a file, a progress bar will be shown. There is also a spinner and a message explaining the current status. The page will show an alert if the user will try to leave the page before it is done finishing. If there was an upload before, the page will show a message noting that.
* View page - shows some text and converted images.

## Conversion
I have used [ConvertAPI](https://www.convertapi.com/) to convert PPT, PPTX, and PDF files into images.  More formats can be used, but they will require testing before adding.

Main advantages:
* Multiple file formats support out-of-the-box.
* Cost - the feature is not heavily used, so the cost should be small, building it up internally will have cost in terms of engineering time for developing and maintaining the service.
* Uploaded files are public, we can safely send the files to a third party.

## Database
I have chosen SQLite as the database for simplicity. The implementation is based on [TypeORM](https://typeorm.io/) and can be easily changed to use Postgres or other databases.

Entities:
- Company - can have multiple pitch decks.
- Pitch Deck - can have multiple uploads.
- Upload - can have multiple related images.
- Image.

I have used `UUID v4` as `id` and `slug`s to uniquely identify pitch decks in URLs.

The project also supports migrations.

## File Storage
At first, I thought about using cloud storage to keep files but then decided on using local storage for simplicity. The implementation can be easily changed to support something like S3.

## Storybooks
This project also includes [Storybook](https://storybook.js.org/). I like it and often use it for preview components.

## Testing
I have also added a couple of testing cases using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).

## Optimizations
The easiest improvement that can be done to improve speed is to use caching for paths and images. I would use Redis for that.

## TODO
There is still quite a bit of room for improvements on many sides:
- At this implementation, a user has to be on the upload page to see the progress. An improvement would be keeping the state of the conversion on the server-side so that we can notify the user if it is done or in progress.
- Handling errors weren't properly implemented.
- Upload page is too big and needs to be refactored, but I don't think I have spare time to do that.
- I would also add feature flagging.

# Setup

Setup is easy:
* create `.env` from `.env.example`
* set `CONVERT_API_SECRET`, which can be obtained from [ConvertAPI](https://www.convertapi.com/). They will give a 7 day trial.
* run `db:seeds:up` to get initial data.

# Running

Run the project using the command: `yarn dev`.