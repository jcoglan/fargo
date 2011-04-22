require 'fileutils'

jake_hook :build_complete do |build|
  FileUtils.copy_entry build.source_dir + '/fargo/lib',
                       build.build_dir + '/lib'
end
