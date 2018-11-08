export const taskTypes = {
  learning: 'learning',
  shopping: 'shopping',
  traveling: 'traveling',
  sport: 'sport',
};

export const taskStatuses = {
  opened: 'opened',
  completed: 'completed',
};

export const saveAction = {
  update: 'update',
  create: 'create',
};

export const taskSchema = {
  id: {
    type: 'string',
  },

  title: {
    type: 'string',
    isRequired: true,
  },

  type: {
    type: 'string',
    isRequired: true,
  },

  description: {
    type: 'string',
    isRequired: true,
  },

  status: {
    type: 'string',
  },
};
