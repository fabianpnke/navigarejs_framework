<?php

namespace Navigare;

use Closure;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Facade;

/**
 * @method static void setRootView(string $name)
 * @method static void setConfiguration(string $name)
 * @method static Configuration getConfiguration()
 * @method static void setVersion(Closure|string|null $version)
 * @method static string getVersion($version)
 * @method static void extend(Closure $callback)
 * @method static LazyProp lazy(Closure $callback)
 * @method static Response render($component, array|Arrayable $props = [])
 * @method static \Symfony\Component\HttpFoundation\Response location(string $url)
 *
 * @see \Navigare\NavigareFactory
 */
class Navigare extends Facade
{
  protected static function getFacadeAccessor(): string
  {
    return NavigareFactory::class;
  }
}
