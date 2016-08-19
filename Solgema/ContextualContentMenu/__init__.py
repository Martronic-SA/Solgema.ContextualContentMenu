from Products.CMFCore import DirectoryView
GLOBALS = globals()
DirectoryView.registerDirectory('skins', GLOBALS)

def initialize(context):
    """Initializer called when used as a Zope 2 product."""
    # Initialize content types
