module Generator
  module MagickHelper
    def self.fonts
      @fonts ||= begin
                   `convert -list font`.
                     lines.
                     select{|line| line =~ /^\s+Font:/}.
                     map{|line| line.split.last}
                 end
    end
  end
end
