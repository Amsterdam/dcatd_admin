const rte = {
  placeholder: 'Tekst of markdown',
  format: 'markdown',
  toolbarConfig: {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS'],
    INLINE_STYLE_BUTTONS: [{
      label: 'Bold',
      style: 'BOLD'
    }, {
      label: 'Italic',
      style: 'ITALIC'
    }],
    BLOCK_TYPE_BUTTONS: [{
      label: 'UL',
      style: 'unordered-list-item'
    },
    {
      label: 'OL',
      style: 'ordered-list-item'
    }]
  }
};

export default rte;
