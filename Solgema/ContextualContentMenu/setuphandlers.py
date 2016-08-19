from zope.component import adapter, getUtility, getAdapters, getMultiAdapter, getSiteManager
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone.utils import getFSVersionTuple
from Products.GenericSetup.interfaces import IProfileImportedEvent

def installSolgemaContextualContentMenu(context):
    if context.readDataFile('solgemacontextualcontentmenu_various.txt') is None:
        return
    site = context.getSite()
    setup = getToolByName(site, 'portal_setup')
    
    if getFSVersionTuple()[0] == 4:
        setup.runAllImportStepsFromProfile('profile-Solgema.ContextualContentMenu:plone4')
        jstool = getToolByName(site, 'portal_javascripts')
        jstool.cookResources()
        csstool = getToolByName(site, 'portal_css')
        csstool.cookResources()
    else:
        setup.runAllImportStepsFromProfile('profile-Solgema.ContextualContentMenu:plone5')

@adapter(IProfileImportedEvent)
def handleProfileImportedEvent(event):
    context = event.tool
    portal_quickinstaller = getToolByName(context, 'portal_quickinstaller')
    if portal_quickinstaller.isProductInstalled('Solgema.ContextualContentMenu') and 'to500' in event.profile_id and event.full_import:
        portal_setup = getToolByName(context, 'portal_setup')
        portal_setup.runAllImportStepsFromProfile('profile-Solgema.ContextualContentMenu:uninstallplone4')
        portal_setup.runAllImportStepsFromProfile('profile-Solgema.ContextualContentMenu:plone5')

