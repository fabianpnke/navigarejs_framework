<?php

namespace App\Http\Requests\Organizations;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => ['required', 'max:100'],
      'email' => ['nullable', 'max:50', 'email'],
      'phone' => ['nullable', 'max:50'],
      'address' => ['nullable', 'max:150'],
      'city' => ['nullable', 'max:50'],
      'region' => ['nullable', 'max:50'],
      'country' => ['nullable', 'max:2'],
      'postal_code' => ['nullable', 'max:25'],
    ];
  }
}
