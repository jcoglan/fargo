require 'fileutils'

jake_hook :build_complete do |build|
  FileUtils.copy_entry build.source_dir + '/fargo/lib',
                       build.build_dir + '/lib'
  
  FileUtils.copy_entry build.source_dir + '/../vendor/js.class/build/min',
                       build.build_dir + '/js.class'
  
  FileUtils.cp 'vendor/heist/lib/builtin/syntax.scm',
               build.build_dir + '/lib/syntax.scm'
  
  %w[util logic numeric list vector].each do |lib|
    FileUtils.cp "vendor/heist/lib/builtin/lib/#{lib}.scm",
                 build.build_dir + "/lib/#{lib}.scm"
  end
  
  FileUtils.copy_entry build.build_dir,
                       build.source_dir + '/../try-fargo/javascripts/fargo'
end
