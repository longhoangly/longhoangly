---
author: Long
layout: post
tags: ["cheatsheets"]
excerpt_separator: <!--short_desc-->
---

A quick reference to common <a href="https://guides.rubygems.org/command-reference" target="_blank">rubygems</a> CLI commands.
<!--short_desc-->

##### Building & publishing

```sh
gem build *.gemspec                 # Build a gem
gem install *.gem                   # Install locally

gem push *.gem                      # Upload to rubygems.org
gem yank -v VERSION [-p PLATFORM]   # Take it back

gem owner GEMNAME -a new_owner@owner.test      # Add new owner
gem owner GEMNAME -r old_owner@owner.test      # Remove an owner
```

##### Querying & installing

```sh
gem install GEMNAME -v VERSION                  # Install from rubygems.org
gem install GEMNAME -v '>= 0.14.0, < 0.14.4'    # Install from rubygems.org
gem uninstall GEMNAME                           # Uninstall a gem

gem list                    # List local gems
gem which rake              # Point to where lib/rake.rb is
gem search -r rails         # [remote] Search for gems
```

##### Opening a gem

```sh
# https://github.com/fnando/gem-open
gem open GEMNAME
GEM_EDITOR="vim" gem open GEMNAME
```

##### Changing to a directory

```sh
cd $(dirname `gem which rake`)  # Go to a gem's path
```

Hope this helps and save time for you.

###### References:
- <a href="https://stackoverflow.com/questions/17026441/ruby-how-to-install-a-specific-version-of-a-ruby-gem" target="_blank">_StackOverflow_</a>
- <a href="https://devhints.io/rubygems" target="_blank">_Devhints.IO_</a>