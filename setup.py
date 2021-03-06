from setuptools import setup, find_packages
import os

version = '0.1'

long_description = '\n\n'.join([
    open('README.rst').read(),
    open('CHANGES.rst').read(),
])

setup(name='Solgema.ContextualContentMenu',
      version=version,
      description="Solgema",
      long_description=long_description,
      # Get more strings from http://www.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        "Topic :: Software Development :: Libraries :: Python Modules",
        ],
      keywords='Solgema, menu, javascript menu',
      author='Martronic SA',
      author_email='martronic@martronic.ch',
      url='http://www.martronic.ch/Solgema/plone_products/solgema_contextualcontentmenu',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['Solgema'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-
      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
