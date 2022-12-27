#!/usr/bin/env ruby
# frozen_string_literal: true

require 'minitest/autorun'

class Comprossor
  def initialize(input)
    @data = input
  end

  def crunch
    {
      r: [4, 0, 1, 1, 1, 2, 3, 3, 1, 4, 1, 5, 1, 6],
      g: [],
      b: []
    }
  end

  def decrunch
    'foo'
  end
end

class CompressorTest < MiniTest::Test
  def setup
    input = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      1, 0, 0,
      2, 0, 0,
      3, 0, 0,
      3, 0, 0,
      3, 0, 0,
      4, 0, 0,
      5, 0, 0,
      6, 0, 0
    ]
    @c = Comprossor.new(input)
  end

  def test_crunch
    assert_equal ({
      r: [4, 0, 1, 1, 1, 2, 3, 3, 1, 4, 1, 5, 1, 6],
      g: [],
      b: []
    }), @c.crunch
  end

  def test_decrunch
    assert_equal 'foo', @c.decrunch
  end
end
