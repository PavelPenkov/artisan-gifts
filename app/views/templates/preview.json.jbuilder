json.cache! ['v1', @image] do
  json.id @image.id
  json.url @image.image.url(:medium)
end
