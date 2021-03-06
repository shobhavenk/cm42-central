import { createSelector } from 'reselect';
import { orderByState, groupStoriesInSprints } from "./backlog";
import { mountPastIterations } from './done';
import * as Column from "../models/beta/column";
import { property } from 'underscore';

const getStories = property('stories');
const getColumn = property('column');
const getProject = property('project');
const getPastIterations = property('pastIterations');

export const getColumns = createSelector(
  [getColumn, getStories, getProject, getPastIterations],
  (column, stories, project, pastIterations) => {
    switch (column) {
      case Column.CHILLY_BIN:
        return stories.filter(story => Column.isChillyBin(story));
      case Column.BACKLOG:
        const orderedStories = orderByState(stories.filter(
          story => Column.isBacklog(story, project))
        );

        return groupStoriesInSprints(orderedStories, project);
      case Column.DONE:
        return mountPastIterations(pastIterations);
    };
  }
);
