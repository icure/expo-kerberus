package com.icure.kerberus.expo

import com.icure.keberus.Challenge
import com.icure.keberus.Solution
import com.icure.keberus.resolveChallenge
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ExpoKerberusModule : Module() {

  companion object {
    const val ON_PROGRESS_EVENT_NAME =  "onProgress"
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoKerberus")

    Events(ON_PROGRESS_EVENT_NAME)

    AsyncFunction("resolveChallenge") Coroutine { challenge: ExpoChallenge, serializedInput: String ->
      resolveChallenge(
        challenge.toChallenge(),
        serializedInput
      ){
        sendEvent(ON_PROGRESS_EVENT_NAME, mapOf("progress" to it))
      }.toExpo()
    }
  }
}

class ExpoChallenge(
  @Field val id: String,
  @Field val salts: List<String>,
  @Field val difficultyFactor: Int
): Record {
  internal fun toChallenge() = Challenge(
    id = id,
    salts = salts,
    difficultyFactor = difficultyFactor
  )
}

class ExpoSolution(
  @Field val id: String,
  @Field val nonces: List<String>,
): Record

internal fun Solution.toExpo() = ExpoSolution(
  id = id,
  nonces = nonces
)