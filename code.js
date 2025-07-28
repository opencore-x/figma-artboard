figma.showUI(__html__, { width: 300, height: 150 });

figma.ui.onmessage = msg => {
  if (msg.type === 'find-similar-artboards') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      return;
    }
    
    const referenceFrame = selection[0];
    
    if (referenceFrame.type !== 'FRAME') {
      return;
    }
    
    const referenceWidth = referenceFrame.width;
    const referenceHeight = referenceFrame.height;
    
    const topLevelFrames = figma.currentPage.children.filter(node => 
      node.type === 'FRAME' && 
      node.width === referenceWidth && 
      node.height === referenceHeight
    );
    
    figma.currentPage.selection = topLevelFrames;
    figma.viewport.scrollAndZoomIntoView(topLevelFrames);
    
    figma.closePlugin();
  }
};