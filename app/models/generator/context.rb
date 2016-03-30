module Generator
  class Context
    def self.from_json(doc)
      kvs = doc[:params].map do |param|
        case param[:type]
        when 'text' then [param[:name], param[:value]]
        when 'image' then [param[:name], Image.find(param[:value]).image.path]
        end
      end
      Hash[kvs]
    end
  end
end
