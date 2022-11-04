<?php

namespace Navigare;

use Navigare\Exceptions\ConfigurationNotFoundException;
use Navigare\Vite\Manifest;

class Configuration
{
  /**
   * Creates a Configuration instance.
   *
   * @param ?string $name The name of the configuration
   */
  public function __construct(protected ?string $name = null)
  {
    $configuration = config('navigare');

    if (!$configuration) {
      throw new ConfigurationNotFoundException($name);
    }

    $this->configuration = $configuration;
  }

  /**
   * Returns the instance of the configuration.
   *
   * @return Configuration
   */
  public static function read(): Configuration
  {
    return new Configuration();
  }

  /**
   * Get value from configuration via path
   *
   * @param string $key
   * @return mixed
   */
  public function get(string $key): mixed
  {
    return data_get($this->configuration, $key);
  }

  /**
   * Returns the SSR input path.
   *
   * @return string
   */
  public function getSSRInputPath(): string
  {
    $input = (string) $this->get('ssr.input');

    /*if ($manifest = $this->getManifest()) {
      $uri = $manifest->resolve($input);
    }*/

    return $input;
  }

  /**
   * Returns the manifest, reading it from the disk if necessary.
   *
   * @return ?Manifest
   */
  public function getSSRManifest(): ?Manifest
  {
    if (!$this->shouldUseManifest()) {
      return null;
    }

    if (!$this->getSSRManifestPath()) {
      return null;
    }

    return $this->manifest ??= Manifest::read($this->getSSRManifestPath());
  }

  /**
   * Returns the manifest path.
   *
   * @return string
   */
  public function getSSRManifestPath(): string
  {
    return (string) $this->get('ssr.manifest');
  }

  /**
   * Returns the client manifest, reading it from the disk if necessary.
   *
   * @return ?Manifest
   */
  public function getClientManifest(): ?Manifest
  {
    if (!$this->shouldUseManifest()) {
      return null;
    }

    if (!$this->getClientManifestPath()) {
      return null;
    }

    return $this->client_manifest ??= Manifest::read(
      $this->getClientManifestPath()
    );
  }

  /**
   * Returns the manifest path.
   *
   * @return string
   */
  public function getClientManifestPath(): string
  {
    return (string) $this->get('client.manifest');
  }

  /**
   * Returns the manifest's md5.
   *
   * @return ?string
   */
  public function getVersion(): string|null
  {
    $manifest = $this->getClientManifest();

    if (!$manifest) {
      return null;
    }

    return md5($manifest->getContent());
  }

  /**
   * Checks if the manifest should be used to get an entry.
   *
   * @return bool
   */
  public function shouldUseManifest(): bool
  {
    // If disabled in tests via the configuration, do not use the manifest.
    if (app()->environment('testing')) {
      return false;
    }

    // If running in production, do use the manifest.
    if (!app()->environment('local')) {
      return true;
    }

    // Otherwise, the manifest should not be used.
    return false;
  }
}
