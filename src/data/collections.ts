import type { Collection } from '../types/photo';

/* ──────────────────────────────────────────────────────────
   Gallery Collections — static data layer.
   All image paths reference /public/ which Vite serves at root.
────────────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: 'swiss',
    slug: 'swiss',
    title: 'In the Swiss Alps',
    subtitle: 'Winter 2023',
    description:
      'A three-week journey through the alpine landscapes of Switzerland in the depths of winter — frozen lakes, silent pine forests, and peaks lost in cloud.',
    coverImage: '/1.jpg',
    tags: ['landscape', 'mountains', 'winter', 'europe'],
    photoCount: 3,
    location: 'Swiss Alps, Switzerland',
    date: '2023-12-01',
    photos: [
      {
        id: 'swiss-01',
        title: 'Morning light on the Matterhorn',
        description: 'First rays of golden hour breaking over the summit ridge.',
        tags: ['mountain', 'golden-hour', 'landscape'],
        location: { name: 'Zermatt, Switzerland' },
        capturedAt: '2023-12-04',
        src: {
          thumbnail: '/1.jpg',
          medium: '/1.jpg',
          full: '/1.jpg',
          lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=',
        },
        width: 800,
        height: 600,
      },
      {
        id: 'swiss-02',
        title: 'Frozen lake at dusk',
        description: 'Lake Lucerne completely frozen over, reflecting the last light.',
        tags: ['lake', 'reflection', 'winter'],
        location: { name: 'Lake Lucerne, Switzerland' },
        capturedAt: '2023-12-08',
        src: {
          thumbnail: '/2.jpg',
          medium: '/2.jpg',
          full: '/2.jpg',
          lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=',
        },
        width: 800,
        height: 600,
      },
      {
        id: 'swiss-03',
        title: 'Alpine village in snowfall',
        description: 'A quiet village dusted with fresh snow at midday.',
        tags: ['village', 'snow', 'landscape'],
        location: { name: 'Grindelwald, Switzerland' },
        capturedAt: '2023-12-11',
        src: {
          thumbnail: '/4.jpg',
          medium: '/4.jpg',
          full: '/4.jpg',
          lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=',
        },
        width: 800,
        height: 600,
      },
    ],
  },

  {
    id: 'forest',
    slug: 'forest',
    title: 'Deep in the Forest',
    subtitle: 'Autumn 2023',
    description:
      'Wandering through ancient woodland as the season turns — cathedral light through a canopy of copper and gold.',
    coverImage: '/9.jpg',
    tags: ['forest', 'nature', 'autumn', 'light'],
    photoCount: 3,
    location: 'Black Forest, Germany',
    date: '2023-10-15',
    photos: [
      {
        id: 'forest-01',
        title: 'Cathedral light',
        description: 'Shafts of autumn light through old-growth beech trees.',
        tags: ['light', 'forest', 'beech'],
        location: { name: 'Black Forest, Germany' },
        capturedAt: '2023-10-16',
        src: { thumbnail: '/9.jpg', medium: '/9.jpg', full: '/9.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 1067,
      },
      {
        id: 'forest-02',
        title: 'Mossy ground',
        description: 'The forest floor carpeted in emerald moss after overnight rain.',
        tags: ['macro', 'moss', 'detail'],
        location: { name: 'Black Forest, Germany' },
        capturedAt: '2023-10-17',
        src: { thumbnail: '/10.jpg', medium: '/10.jpg', full: '/10.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 600,
      },
      {
        id: 'forest-03',
        title: 'River in autumn',
        description: 'A fast-flowing stream cutting through fallen leaves.',
        tags: ['water', 'autumn', 'river'],
        location: { name: 'Black Forest, Germany' },
        capturedAt: '2023-10-18',
        src: { thumbnail: '/11.jpg', medium: '/11.jpg', full: '/11.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 600,
      },
    ],
  },

  {
    id: 'jungle',
    slug: 'jungle',
    title: 'Breathing in the Jungle',
    subtitle: 'Summer 2023',
    description:
      'Humidity, colour, and life in abundance — deep inside a tropical rainforest where every shadow holds something extraordinary.',
    coverImage: '/12.jpg',
    tags: ['jungle', 'tropical', 'nature', 'travel'],
    photoCount: 3,
    location: 'Borneo, Malaysia',
    date: '2023-07-20',
    photos: [
      {
        id: 'jungle-01',
        title: 'Into the canopy',
        description: 'Looking straight up through a hundred metres of layered green.',
        tags: ['canopy', 'perspective', 'green'],
        location: { name: 'Danum Valley, Borneo' },
        capturedAt: '2023-07-21',
        src: { thumbnail: '/12.jpg', medium: '/12.jpg', full: '/12.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 600,
      },
      {
        id: 'jungle-02',
        title: 'River crossing',
        description: 'A narrow wooden bridge over fast brown water.',
        tags: ['bridge', 'river', 'travel'],
        location: { name: 'Kinabatangan River, Borneo' },
        capturedAt: '2023-07-24',
        src: { thumbnail: '/4.jpg', medium: '/4.jpg', full: '/4.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 600,
      },
      {
        id: 'jungle-03',
        title: 'Morning mist',
        description: 'Fog lifting off the jungle floor just after sunrise.',
        tags: ['mist', 'atmosphere', 'morning'],
        location: { name: 'Danum Valley, Borneo' },
        capturedAt: '2023-07-26',
        src: { thumbnail: '/2.jpg', medium: '/2.jpg', full: '/2.jpg', lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAJhAAAQMDAwQDAQAAAAAAAAAAAQIDBAUREiFBMVFxE2GR0f/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AMfpanAp1tQU1IJWCAQpWxJHnPuqy6yq44lV4xhNkjj9VDSsaqTFqE2qhFpiYhp0OOlGEgFQGMn2jzVXuKqmrNzTKqg4Soh1AiZxkADlWd/g8UBkXKUtGtKtOqTb8Wo23DqgpMl5SHW2xtSQCM888miqAXBFxcQofAoooA/9k=' },
        width: 800, height: 600,
      },
    ],
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);
