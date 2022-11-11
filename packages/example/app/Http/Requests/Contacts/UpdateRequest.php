<?php

namespace App\Http\Requests\Contacts;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UpdateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'first_name' => ['required', 'max:50'],
      'last_name' => ['required', 'max:50'],
      'organization_id' => [
        'nullable',
        Rule::exists('organizations', 'id')->where(function ($query) {
          $query->where('account_id', Auth::user()->account_id);
        }),
      ],
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
