import React, { useEffect, useCallback, useState } from 'react'
import { CCol, CInput, CRow } from '@coreui/react'

export function NumberInputField({ required, min, max, step, tooltip, range, value, setValue, setValid, disabled }) {
	const [tmpValue, setTmpValue] = useState(null)

	// Check if the value is valid
	const isValueValid = useCallback(
		(val) => {
			if (val === '') {
				// If required, it must not be empty
				if (required) {
					return false
				}
			} else {
				// If has a value, it must be a number
				if (isNaN(val)) {
					return false
				}

				// Verify the value range
				if (min !== undefined && val < min) {
					return false
				}
				if (max !== undefined && val > max) {
					return false
				}
			}

			return true
		},
		[required, min, max]
	)

	// If the value is undefined, populate with the default. Also inform the parent about the validity
	useEffect(() => {
		setValid?.(isValueValid(value))
	}, [isValueValid, value, setValid])

	const onChange = useCallback(
		(e) => {
			const parsedValue = parseFloat(e.currentTarget.value)
			const processedValue = isNaN(parsedValue) ? e.currentTarget.value : parsedValue
			setTmpValue(processedValue)
			setValue(processedValue)
			setValid?.(isValueValid(processedValue))
		},
		[setValue, setValid, isValueValid]
	)

	// Render the input
	const input = (
		<CInput
			type="number"
			disabled={disabled}
			value={tmpValue ?? value ?? 0}
			min={min}
			max={max}
			step={step}
			style={{ color: !isValueValid(tmpValue ?? value) ? 'red' : undefined }}
			title={tooltip}
			onChange={onChange}
			onFocus={() => setTmpValue(value ?? '')}
			onBlur={() => setTmpValue(null)}
		/>
	)

	if (range) {
		return (
			<CRow>
				<CCol sm={12}>{input}</CCol>
				<CCol sm={12}>
					<CInput
						type="range"
						disabled={disabled}
						value={tmpValue ?? value ?? 0}
						min={min}
						max={max}
						step={step}
						title={tooltip}
						onChange={onChange}
						onFocus={() => setTmpValue(value ?? '')}
						onBlur={() => setTmpValue(null)}
					/>
				</CCol>
			</CRow>
		)
	} else {
		return input
	}
}
