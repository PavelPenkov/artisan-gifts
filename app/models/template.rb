class Template < ActiveRecord::Base
  validates :data, presence: :true
  serialize :data, Hash

  def display_name
    name || "Шаблон #{id}"
  end

  def param_meta
    meta = {}
    meta[:params] = []
    meta[:values] = {}
    data[:frames].each_with_index do |frame, i|
      meta[:params] << { id: i, name: frame[:param], type: frame_to_param_type(frame[:type])}
      meta[:values][frame[:param]] = ''
    end
    meta
  end

  def frame_to_param_type(frame_type)
    case frame_type
    when 'text' then 'text'
    when 'overlay' then 'image'
    end
  end

  def context_from_params(params)
    ctx = {}
    ctx[:params] = []
    data[:frames].each do |frame|
      param = {
        type: frame_to_param_type(frame[:type]),
        name: frame[:param],
        value: params[frame[:param]]
      }
      ctx[:params] << param
    end
    ctx
  end
end
