import React from 'react'
import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {useAddSavedFeedMutation} from '#/state/queries/preferences'
import {atoms as a, useTheme} from '#/alf'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'

export function NoFollowingFeed() {
  const t = useTheme()
  const {_} = useLingui()
  const {mutateAsync: addSavedFeed} = useAddSavedFeedMutation()

  const addRecommendedFeeds = React.useCallback(
    (e: any) => {
      e.preventDefault()

      addSavedFeed({
        type: 'timeline',
        value: 'home',
        pinned: true,
      })

      // prevent navigation
      return false
    },
    [addSavedFeed],
  )

  return (
    <View style={[a.flex_row, a.flex_wrap, a.align_center, a.py_md, a.px_lg]}>
      <Text
        style={[a.leading_snug, t.atoms.text_contrast_medium, {maxWidth: 310}]}>
        <Trans>Looks like you're missing a following feed.</Trans>{' '}
      </Text>

      <InlineLinkText
        to="/"
        label={_(msg`Add the default feed of only people you follow`)}
        onPress={addRecommendedFeeds}
        style={[a.leading_snug]}>
        <Trans>Click here to add one.</Trans>
      </InlineLinkText>
    </View>
  )
}
