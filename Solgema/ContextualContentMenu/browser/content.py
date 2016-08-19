from Products.Five import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFPlone.utils import getFSVersionTuple

class ContextualContentMenu(BrowserView):
    v4template=ViewPageTemplateFile('contextualContentMenu_old.pt')
    v5template=ViewPageTemplateFile('contextualContentMenu.pt')
    
    def __call__(self):
        if getFSVersionTuple()[0] == 4:
            return self.v4template()
        return self.v5template()
    
