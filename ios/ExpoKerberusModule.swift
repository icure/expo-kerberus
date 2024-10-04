import ExpoModulesCore
import KerberusKotlin
import Foundation

public class ExpoKerberusModule: Module {
    
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoKerberus')` in JavaScript.
    Name("ExpoKerberus")
      
    Events("onProgress")

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
      AsyncFunction("resolveChallenge") { (challenge: ExpoChallenge, serializedInput: String) -> ExpoSolution in
          try await KerberusKt.resolveChallenge(config: challenge.toChallenge(), serializedInput: serializedInput) { progress in
              self.sendEvent("onProgress", ["progress": progress.doubleValue])
          }.toExpoSolution()
    }
  }
}

struct ExpoChallenge: Record {
    @Field
    var id: String
    @Field
    var salts: [String]
    @Field
    var difficultyFactor: Int

    func toChallenge() -> Challenge {
        return Challenge(id: id, salts: salts, difficultyFactor: Int32(difficultyFactor))
    }
}

struct ExpoSolution: Record {
    @Field
    var id: String
    @Field
    var nonces: [String]
}

extension Solution {
    func toExpoSolution() -> ExpoSolution {
        return ExpoSolution(id: Field(wrappedValue: id), nonces: Field(wrappedValue: nonces))
    }
}
